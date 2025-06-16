import React, { useEffect, useState } from "react";
import './Statistics.css';
import axios from "axios";
import { useSection } from "../../Context";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Statistics() {

  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const {setSection } = useSection();
  const [allAccounts, setAllAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [date, setDate] = useState('');
  const [totalRec, setTotalRec] = useState([]);
  

  setSection('Statistics');

  const fetchStatisticsByAccountId = async (accountId) => {
    setGraphData([])
    setFullData([])
    setTotalRec([])
    
    if (!accountId) return;

      const toastId = toast.loading("Loading statistics...");
    try {
      const res = await axios.get(`https://srv810632.hstgr.cloud/api/statistics?id=${accountId}`);
      const graphData = res.data.graph_data || [];
      const total_rec = res.data.total_rec || [];

      const sortedData = graphData
        .map(item => ({ ...item, date: item.date }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setFullData(sortedData);
      setData(sortedData);
      setTotalRec(total_rec);
      if (total_rec[0] == 0){       
      toast.update(toastId, {
        render: "No data found for this account",
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
      }
      else{
        toast.update(toastId, {
          render: "Loading successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Something went wrong.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (!date || fullData.length === 0) return;
  
    const selectedDate = new Date(date);
    const last7Days = [];
  
    for (let i = 6; i >= 0; i--) {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() - i);
  
      const formattedDate = d.toISOString().split('T')[0]; // YYYY-MM-DD
      last7Days.push(formattedDate);
    }
  
    // Build map for quick lookup
    const fullDataMap = Object.fromEntries(fullData.map(item => [item.date, item]));
  
    // Create final array with 0-filled objects for missing days
    const uniformData = last7Days.map(dateStr => {
      return (
        fullDataMap[dateStr] || {
          date: dateStr,
          total: 0,
          post_count: 0,
          reel_count: 0,
          has_tried: 0,
          has_posted: 0,
          failed: 0,
        }
      );
    });
    setGraphData(uniformData)

  }, [date, fullData]);
  

  const fetchAllAccounts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://srv810632.hstgr.cloud/api/allaccountlist');
      setAllAccounts(response.data.accounts);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  useEffect(() => {
    if (!Array.isArray(allAccounts)) return;

    if (query.trim() === '') {
      setFilteredAccounts([]);
    } else {
      const filtered = allAccounts.filter(acc =>
        acc.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAccounts(filtered);
    }
  }, [query, allAccounts]);

  const handleSelect = (account) => {
    setSelectedAccount(account);
    setQuery(account.username);
    setFilteredAccounts([]);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
    <ToastContainer />
      <title>Statistics</title>
      <div className="skeleton-bar-char" id="statistics">
        <div className="container-1200">
          <div className="row clearfix">
            <div className="selectize-control mb-10 multi plugin-remove_button plugin-drag_drop plugin-preserve_search st-picker">
              <div className="account-selector" style={{ position: 'relative', width: '300px' }}>
                <div style={{ position: 'relative', display: 'flex' }}>
                  <input
                    type="text"
                    value={query}
                    placeholder={loading ? "Loading accounts..." : "Select account..."}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedAccount(null);
                    }}
                    style={{ width: '100%', padding: '10px', border: '1px solid #7a7a7a', color: '#7a7a7a' }}
                    disabled={loading}
                  />
                  <button onClick={fetchAllAccounts} className='ref-btn'>Refresh</button>
                </div>

                {filteredAccounts.length > 0 && !selectedAccount && (
                  <ul className="suggestions-dropdown" style={{
                    border: '1px solid #ccc',
                    borderTop: 'none',
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: 'white',
                    zIndex: 10,
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {filteredAccounts.map((account) => (
                      <li
                        key={account.id}
                        onClick={() => handleSelect(account)}
                        style={{ padding: '8px', cursor: 'pointer' }}
                      >
                        {account.username}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label htmlFor="date">Select a Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={handleDateChange}
                  min={fullData[0]?.date}
                  max={fullData[fullData.length - 1]?.date}
                />
              </div>

              <button
                className='btn-lg'
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  if (selectedAccount) {
                    if (date !== '') {
                      fetchStatisticsByAccountId(selectedAccount.id);
                    } else {
                      alert("Please select a date.");
                    }
                  } else {
                    alert("Please select an account first.");
                  }
                }}
              >
                Get Data
              </button>
            </div>

            {/* Charts */}
            <div style={{ width: '100%', height: 500 }}>  
              <h1 className="over-heading">Overall Statistics For This Account</h1>
              {totalRec && (
                <div className="summary-container" style={{ display: 'grid', gap: '20px' , 'grid-template-columns':'1fr 1fr'}}>
                
                  {/* Pie 1 */}
                  <div className="summary-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Number of Tried & Remaining </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        {/* Pie Chart */}
                        <Pie
                          data={[
                            { name: 'Tried', value: totalRec[3] || 0 },
                            { name: 'Remaining', value: totalRec[0] - totalRec[3]  || 0 },                        
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label // ? show edge labels
                          labelLine // ? show lines
                        >
                          {['#82ca9d', '#ff6b6b'].map((fillColor, index) => (
                            <Cell key={`cell-${index}`} fill={fillColor} />
                          ))}
                        </Pie>

                        {/* ? Center Total Text rendered separately */}
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            pointerEvents: 'none', // prevent hover effects
                          }}
                        >
                          Scheduled: {(totalRec[1] || 0) + (totalRec[2] || 0)}
                        </text>

                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>


                  </div>
                  {/* Pie 2 */}
                  <div className="summary-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Number of Posts & Reels</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        {/* Pie Chart */}
                        <Pie
                          data={[
                            { name: 'Posts', value: totalRec[1] || 0 },
                            { name: 'Reels', value: totalRec[2] || 0 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label // ? show edge labels
                          labelLine // ? show lines
                        >
                          {['#348368', '#82ca9d'].map((fillColor, index) => (
                            <Cell key={`cell-${index}`} fill={fillColor} />
                          ))}
                        </Pie>

                        {/* ? Center Total Text rendered separately */}
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            pointerEvents: 'none', // prevent hover effects
                          }}
                        >
                          Total: {(totalRec[1] || 0) + (totalRec[2] || 0)}
                        </text>

                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>


                  </div>
                  


                  {/* Pie 3 */}
                  <div className="summary-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Number of Posted & Failed</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        {/* Pie Chart */}
                        <Pie
                          data={[
                            { name: 'Posted', value: totalRec[4] || 0 },
                            { name: 'Failed', value: totalRec[5] || 0 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label // ? show edge labels
                          labelLine // ? show lines
                        >
                          {['#82ca9d', '#ff6b6b'].map((fillColor, index) => (
                            <Cell key={`cell-${index}`} fill={fillColor} />
                          ))}
                        </Pie>

                        {/* ? Center Total Text rendered separately */}
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            pointerEvents: 'none', // prevent hover effects
                          }}
                        >
                          Tried: {(totalRec[4] || 0) + (totalRec[5] || 0)}
                        </text>

                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>


                  </div>

                  {/* Pie 4 */}
                  <div className="summary-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Number of GCS Files Deleted</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        {/* Pie Chart */}
                        <Pie
                          data={[
                            { name: 'Deleted', value: totalRec[6] || 0 } ,
                            { name: 'Failed', value: totalRec[4] - totalRec[6]  || 0 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label // ? show edge labels
                          labelLine // ? show lines
                        >
                          {['#82ca9d', '#ff6b6b'].map((fillColor, index) => (
                            <Cell key={`cell-${index}`} fill={fillColor} />
                          ))}
                        </Pie>

                        {/* ? Center Total Text rendered separately */}
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            pointerEvents: 'none', // prevent hover effects
                          }}
                        >
                          Total: {(totalRec[4] || 0)}
                        </text>

                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>


                  </div>
                </div>
              )}

              {/* Bar Chart */}
              <h1 className="over-heading">Last 7 Days:</h1>
              <h2 className="graph-heading">{graphData.length>0? `From ${graphData[0].date } to ${graphData[6].date}`:''

            }</h2>
             
              <ResponsiveContainer style={{paddingBottom:'50px'}}>
                <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total Scheduled" />
                  <Bar dataKey="post_count" fill="#82ca9d" name="Posts" />
                  <Bar dataKey="reel_count" fill="#ffc658" name="Reels" />
                  <Bar dataKey="has_tried" fill="#d88484" name="Tried" />
                  <Bar dataKey="has_posted" fill="#84d8c4" name="Posted" />
                  <Bar dataKey="failed" fill="#ff6b6b" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

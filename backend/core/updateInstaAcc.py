from . import models


def update_account(account_id, status):
    obj = models.InstagramAccount.objects.get(id=account_id)
    if obj:
        try:
            obj.free_for_posting = status
            obj.save() 
            return True
        except:
            return False
    return False
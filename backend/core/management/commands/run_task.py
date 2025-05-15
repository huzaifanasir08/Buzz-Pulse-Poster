from django.core.management.base import BaseCommand
from ...instagram_post import post
import asyncio

class Command(BaseCommand):
    help = 'Runs the background task'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting background task...'))
        post()



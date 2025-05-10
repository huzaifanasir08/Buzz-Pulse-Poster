from django.core.management.base import BaseCommand
# from ...dm import refreshToken
import asyncio

class Command(BaseCommand):
    help = 'Runs the background task'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting background task...'))
        # token = refreshToken()
        # print(token)



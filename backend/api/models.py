from django.db import models

class User(models.Model):
    acc_username = models.CharField(max_length=50, unique=True)
    acc_password = models.DateField()  # birthdate
    f_name = models.CharField(max_length=100)
    l_name = models.CharField(max_length=100)
    year_graduated = models.CharField(max_length=4)

    def __str__(self):
        return self.acc_username

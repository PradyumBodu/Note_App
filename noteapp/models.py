from django.db import models
from django.utils.crypto import get_random_string
from django.utils.text import slugify

# Create your models here.
class Note(models.Model):

    CATEGORY = (
        ('BUSINESS','Business'),
        ('PERSONAL','Personal'),
        ('IMPORTANT','Important')
        )


    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(unique=True,blank=True,null=True)
    category = models.CharField(max_length=15,choices=CATEGORY,default='PERSONAL')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        org_slug = self.slug #note-app
        counter = 1

        while Note.objects.filter(slug = self.slug).exclude(pk=self.pk).exists():
            self.slug = f'{org_slug}-{get_random_string(5)}'
            counter += 1
            if counter > 5:
                break
        
        super(Note,self).save(*args,**kwargs)

    def __str__(self):
        return self.title
from django import template

register = template.Library()


@register.filter(name='add_class')
def add_class(field, classes):
    return field.as_widget(attrs={"class": classes})


@register.filter(is_safe=True)
def label_tag_with_classes(field, classes):
    return field.label_tag(attrs={"class": classes})

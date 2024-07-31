from django.core.exceptions import ValidationError
from django.utils.translation import ngettext_lazy


class PasswordCharacterValidator:
    special_characters = '~!$@#&"(){}[]\'^%+*-_:;'

    def __init__(self, min_length_upper=1, min_length_lower=1, min_length_special=1, min_length_digit=1):
        self.min_length_upper = min_length_upper
        self.min_length_lower = min_length_lower
        self.min_length_special = min_length_special
        self.min_length_digit = min_length_digit

    def validate(self, password, user=None):
        validation_errors = []
        if len([char for char in password if char.islower()]) < self.min_length_lower:
            validation_errors.append(ValidationError(
                ngettext_lazy(
                    'Le mot de passe doit contenir au moins %(min_length_lower)d caractère minuscule',
                    'Le mot de passe doit contenir au moins %(min_length_lower)d caractères minuscules',
                    self.min_length_lower
                ),
                code='min_length_lower',
                params={'min_length_lower': self.min_length_lower},
            ))
        if len([char for char in password if char.isupper()]) < self.min_length_upper:
            validation_errors.append(ValidationError(
                ngettext_lazy(
                    'Le mot de passe doit contenir au moins %(min_length_upper)d caractère majuscule',
                    'Le mot de passe doit contenir au moins %(min_length_upper)d caractères majuscules',
                    self.min_length_upper
                ),
                code='min_length_upper',
                params={'min_length_upper': self.min_length_upper},
            ))
        if len([char for char in password if char in self.special_characters]) < self.min_length_special:
            validation_errors.append(ValidationError(
                ngettext_lazy(
                    'Le mot de passe doit contenir au moins %(min_length_special)d caractère spécial',
                    'Le mot de passe doit contenir au moins %(min_length_special)d caractères spéciaux',
                    self.min_length_special
                ),
                code='min_length_special',
                params={'min_length_special': self.min_length_special},
            ))
        if len([char for char in password if char.isdigit()]) < self.min_length_digit:
            validation_errors.append(ValidationError(
                ngettext_lazy(
                    'Le mot de passe doit contenir au moins %(min_length_digit)d chiffre',
                    'Le mot de passe doit contenir au moins %(min_length_digit)d chiffres',
                    self.min_length_digit
                ),
                code='min_length_digit',
                params={'min_length_digit': self.min_length_digit},
            ))
        if validation_errors:
            raise ValidationError(validation_errors)

    def get_help_text(self):
        message = 'Votre mot de passe doit contenir au moins'
        if self.min_length_lower:
            message += ngettext_lazy(
                ' %(min_length_lower)s minuscule',
                ' %(min_length_lower)s minuscules',
                self.min_length_lower
            ) % {'min_length_lower': self.min_length_lower}
        if self.min_length_upper:
            message += ngettext_lazy(
                ', %(min_length_upper)s majuscule',
                ', %(min_length_upper)s majuscules',
                self.min_length_upper
            ) % {'min_length_upper': self.min_length_upper}
        if self.min_length_digit:
            message += ngettext_lazy(
                ', %(min_length_digit)s chiffre',
                ', %(min_length_digit)s chiffres',
                self.min_length_digit
            ) % {'min_length_digit': self.min_length_digit}
        if self.min_length_special:
            message += ngettext_lazy(
                ' et %(min_length_special)s caractère spécial parmi %(special_symbols)s',
                ' et %(min_length_special)s caractères spéciaux parmi %(special_symbols)s',
                self.min_length_special
            ) % {'min_length_special': self.min_length_special, 'special_symbols': self.special_characters}
        message += '.'
        return message

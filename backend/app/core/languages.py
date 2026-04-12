import pycountry


def get_all_languages():
    languages = []

    for lang in pycountry.languages:
        code = getattr(lang, "alpha_2", None)
        name = getattr(lang, "name", None)

        if code and name:
            languages.append({
                "code": code,
                "label": name
            })

    return sorted(languages, key=lambda x: x["label"])

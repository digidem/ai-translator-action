import os

class ConfigurationError(Exception):
    pass


def load_config():
    config = {
        "SOURCE_LANGUAGE": os.environ.get("INPUT_SOURCE_LANGUAGE", "English"),
        "TARGET_LANGUAGE": os.environ.get("INPUT_TARGET_LANGUAGE", "Chinese"),
        "API_KEY": os.environ.get("INPUT_API_KEY", ""),
        "I18N_SURFIX": os.environ.get("INPUT_I18N_SURFIX", ""),
        "ADDITIONAL_PROMPT": os.environ.get("INPUT_ADDITIONAL_PROMPT", ""),
        "FILE_TYPES": os.environ.get("INPUT_FILE_TYPES", "md,mdx,rst,txt,py,js,json,html,cpp,c,ipynb"),
        "FILE_PATHS_FILTER": os.environ.get("INPUT_FILE_PATHS_FILTER", ".*"),
    }

    missing_keys = not config["API_KEY"]
    if missing_keys:
        raise ConfigurationError(
            f"Missing required environment variables: {', '.join(missing_keys)}")

    return config

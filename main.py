import os
import logging
from continuous_translation.file_processing import translate_files
from continuous_translation.config import ConfigurationError, load_config

repo_path = "local_repo"

def main():
    logging.basicConfig(level=logging.INFO)
    try:
        config = load_config()
    except ConfigurationError as e:
        logging.error(str(e))
        return
    translate_files(config)

if __name__ == "__main__":
    main()
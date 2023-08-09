const loadConfig = () => {
  const config = {
    SOURCE_LANGUAGE: process.env.INPUT_SOURCE_LANGUAGE || "English",
    TARGET_LANGUAGE: process.env.INPUT_TARGET_LANGUAGE || "Chinese",
    API_KEY: process.env.INPUT_API_KEY || "",
    I18N_SURFIX: process.env.INPUT_I18N_SURFIX || "",
    ADDITIONAL_PROMPT: process.env.INPUT_ADDITIONAL_PROMPT || "",
    FILE_TYPES: process.env.INPUT_FILE_TYPES || "md,mdx,rst,txt,py,js,json,html,cpp,c,ipynb",
    FILE_PATHS_FILTER: process.env.INPUT_FILE_PATHS_FILTER || ".*",
  };

  const missingKeys = !config.API_KEY;
  if (missingKeys) {
    throw new ConfigurationError(
      `Missing required environment variables: ${missingKeys.join(", ")}`
    );
  }

  return config;
};

class ConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConfigurationError";
  }
}

module.exports = {
  loadConfig,
  ConfigurationError,
};
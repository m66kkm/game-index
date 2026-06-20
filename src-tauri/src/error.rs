use std::fmt;

/// 统一的应用错误类型，封装所有可能的后端错误来源
#[derive(Debug)]
pub enum AppError {
    /// 数据库操作错误
    Database(String),
    /// 网络请求错误
    Network(String),
    /// 文件系统操作错误
    FileSystem(String),
    /// Steam API 相关错误
    SteamApi(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::Database(msg) => write!(f, "数据库错误: {}", msg),
            AppError::Network(msg) => write!(f, "网络错误: {}", msg),
            AppError::FileSystem(msg) => write!(f, "文件系统错误: {}", msg),
            AppError::SteamApi(msg) => write!(f, "Steam API 错误: {}", msg),
        }
    }
}

impl std::error::Error for AppError {}

impl From<rusqlite::Error> for AppError {
    fn from(err: rusqlite::Error) -> Self {
        AppError::Database(err.to_string())
    }
}

impl From<reqwest::Error> for AppError {
    fn from(err: reqwest::Error) -> Self {
        AppError::Network(err.to_string())
    }
}

impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        AppError::FileSystem(err.to_string())
    }
}

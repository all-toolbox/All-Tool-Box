use tauri::{WebviewUrl, WebviewWindowBuilder};

#[cfg(target_os = "macos")]
use tauri::TitleBarStyle;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        // TODO: needs new setup for open source build
        // .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            #[cfg(target_os = "windows")]
            let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("AllToolBox")
                .decorations(false)
                // .icon("../icons/icon.ico")
                .inner_size(960.0, 600.0);

            #[cfg(target_os = "linux")]
            let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("AllToolBox")
                .decorations(false)
                // .icon("../icons/icon.png")
                .inner_size(960.0, 600.0);

            #[cfg(target_os = "macos")]
            let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("AllToolBox")
                // .icon("../icons/icon.icns")
                .inner_size(960.0, 600.0);

            // set transparent title bar only when building for macOS
            #[cfg(target_os = "macos")]
            let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);

            let window = win_builder.build().unwrap();

            // set background color only when building for macOS
            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::{NSColor, NSWindow};
                use cocoa::base::{id, nil};

                let ns_window = window.ns_window().unwrap() as id;
                unsafe {
                    let bg_color = NSColor::colorWithRed_green_blue_alpha_(
                        nil,
                        22.0 / 255.0,
                        22.0 / 255.0,
                        22.0 / 255.0,
                        1.0,
                    );
                    ns_window.setBackgroundColor_(bg_color);
                }
            }

            Ok(())
        })
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        // TODO: move favorites off of stronghold
        .plugin(
            tauri_plugin_stronghold::Builder::new(|password| {
                // Hash the password here with e.g. argon2, blake2b or any other secure algorithm
                // Here is an example implementation using the `rust-argon2` crate for hashing the password
                use argon2::{hash_raw, Config, Variant, Version};

                let config = Config {
                    lanes: 4,
                    mem_cost: 10_000,
                    time_cost: 10,
                    variant: Variant::Argon2id,
                    version: Version::Version13,
                    ..Default::default()
                };
                let salt = "temp_salt".as_bytes();
                let key =
                    hash_raw(password.as_ref(), salt, &config).expect("failed to hash password");

                key.to_vec()
            })
            .build(),
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

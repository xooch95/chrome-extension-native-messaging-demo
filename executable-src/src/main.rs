use chrome_native_messaging::event_loop;
use serde::Serialize;
use serde_json::Value;

#[derive(Serialize)]
struct BasicMessage<'a> {
    payload: &'a str,
}

fn main() {
    event_loop(|value| match value {
        Value::Null => Err("null payload"),
        _ => Ok(BasicMessage {
            payload: "Hello, World!",
        }),
    });
}

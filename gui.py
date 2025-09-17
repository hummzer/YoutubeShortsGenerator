import tkinter as tk
from tkinter import messagebox
import threading
import wales  # Import your existing script

def start_processing():
    """
    Function to be called when the button is clicked.
    """
    url = url_entry.get().strip()
    if not url:
        messagebox.showerror("Error", "Please enter a YouTube URL.")
        return

    # Disable the button and show a status message
    download_button.config(state=tk.DISABLED)
    status_label.config(text="Processing started... Please wait.")

    # Run the video processing in a separate thread
    threading.Thread(target=run_wales_script, args=([url],)).start()

def run_wales_script(urls):
    """
    Calls the main logic from wales.py.
    """
    try:
        wales.process_videos(urls)
        status_label.config(text="Processing complete!", fg="green")
        messagebox.showinfo("Success", "Video shorts have been generated.")
    except Exception as e:
        status_label.config(text=f"An error occurred: {e}", fg="red")
        messagebox.showerror("Error", f"An error occurred: {e}")
    finally:
        # Re-enable the button after processing is done
        download_button.config(state=tk.NORMAL)

# Set up the main application window
root = tk.Tk()
root.title("YouTube Shorts Generator")
root.geometry("400x150")
root.resizable(False, False)

# Create a label and an entry field for the URL
url_label = tk.Label(root, text="Enter YouTube URL:")
url_label.pack(pady=(10, 0))

url_entry = tk.Entry(root, width=50)
url_entry.pack(pady=5)

# Create a button to start the process
download_button = tk.Button(root, text="Generate Shorts", command=start_processing)
download_button.pack(pady=10)

# Create a label to display the status
status_label = tk.Label(root, text="", fg="blue")
status_label.pack(pady=5)

# Start the GUI application
root.mainloop()
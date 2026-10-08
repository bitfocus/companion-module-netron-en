## Netron EN

This module will allow you to control a Netron EN lighting device.

### Configuration
* Enter the IP Address of the device.
* Enable or disable polling of the device for feedback items
* Select a rate to poll the device

**Available actions:**
* Run Cue
* Clear Cue
* Set Cue

**Available feedback:**
* Cue [x] is Running

NOTE: Cue number feedback requires careful naming of the cues in the Netron EN.
This is because of a limitation of the current Netron API.
The following naming formats will work: "Cue 6" or "6|Cue Name". 
The Companion variable used for button feedback will be set to the number ("6").
Any other cue name format will result in the variable being set to 0.

**Available Variables:**
* Currently Running Cue Name (current_cue_name)
* Currently Running Cue Number (current_cue_

**Available Presets:**
* Run Cue [1-99] (with feedback)

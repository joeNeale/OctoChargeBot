# OctoChargeBot

# OctoChargeBot Scheduler

OctoChargeBot Scheduler is a Home Assistant automation designed specifically for Solis inverter battery systems, working in tandem with Octopus Energy's Flux Tariff in the UK. It smartly schedules charging times by leveraging the free electricity periods announced via Octopus Energy emails, ensuring efficient energy use and cost savings.

## Overview

Use Octopus Energy's Flux Tariff to automate my Solis inverter battery charging. OctoChargeBot Scheduler uses email notifications to treat free electricity periods as scheduled events, optimizing charging times for efficiency and cost-effectiveness.

## Features

- **Octopus Energy Flux Tariff Integration**: Custom-built for the Flux Tariff to utilise free electricity periods.
- **Solis Inverter Battery Compatibility**: Controls Solis inverter batteries for automated charging.
- **Email and Calendar Automation**: Employs smart automation to schedule charging times based on Octopus Energy's email notifications and calendar events.

## Getting Started

### Prerequisites

- Home Assistant with internet connection.
- Solis inverter battery system integrated with Home Assistant.
- Octopus Energy's Flux Tariff subscription with email notifications.
- A Home Assistant-compatible calendar (Google Calendar or CalDAV).

### Setup Guide

1. **Calendar Integration**:
   - Integrate your chosen calendar with Home Assistant. [Home Assistant Calendar Integration](https://www.home-assistant.io/integrations/google/)
   - Set up a dedicated calendar for Octopus Energy's free electricity periods.

2. **Email to Calendar Automation**:
    - Use Google Apps Script to parse incoming emails from Octopus Energy about free electricity periods.
    - Create a Google Apps Script that scans a Gmail inbox for emails from Octopus Energy containing notifications about free electricity periods.
    - The script should extract the relevant information (date and time of the free periods) and automatically create events in your dedicated Home Assistant calendar for these periods.

3. **Home Assistant Automations**:
   - **Start Charging**: Trigger charging to start just before a calendar event.
   - **Stop Charging**: End charging as the event concludes.

## ToDo List

- [x] Set up iCloud rule to forward emails with specific subjects to Gmail.
- [x] Write Google Apps Script for converting emails to calendar events.
- [ ] Implement Home Assistant automations for charging control.
- [ ] Test the system with actual free electricity periods.
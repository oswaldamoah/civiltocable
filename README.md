# CivilToCable

A distance-based cable cost cutter for fiber-optic deployment.

## Walkthrough
<img src="https://github.com/oswaldamoah/civiltocable/blob/main/screenshots/walkthrough.webp" width="100%" alt="Walkthrough animation">

---

## Problem

In planning fiber-optic connections, field engineers and planners often need to **manually determine the best preset cable lengths** to match ground-measured distances between connection points. This process is **time-consuming**, prone to **waste**, and **lacks optimization**—especially when combining multiple cable sizes.

---

## Solution

**CivilToCable** is a tool designed to **automate cable selection** based on distance inputs and available cable presets.

It offers:

* **Single and multiple cable solutions** to cover each ground distance efficiently
* **Text entry or file import** (CSV/XLSX) of preset cable lengths and measured distances
* **Persistent state with caching** (your data doesn't reset on page reload)
* **Installable as a PWA** (downloadable app on mobile and PC)
* **Modern UI** with a fullscreen hover-panel for streamlined input and filtering
* **Quick switching between datasets** and exporting your results

---

## Features

* **Dynamic Matching Engine**: Suggests exact and close-fit cable combinations (even multiple cables per segment).
* **Dark Mode UI**: Clean, modern fullscreen interface.
* **CSV/XLSX Support**: Import/export your cable presets or distance data in Excel-friendly formats.
* **PWA Support**: Use offline and install on desktop or mobile like a native app.
* **No Server Needed**: All data stays local. Secure and fast.
  
---

## 🖼️ Screenshots
![screenshots/civiltocable_s1.png](/screenshots/civiltocable_s1.png)
![screenshots/civiltocable_s1.png](/screenshots/civiltocable_s2.png)

---


## 📂 How to Use

1. **Open the app**: [civiltocable.vercel.app](https://civiltocable.vercel.app)
2. **Input your data**:

   * Enter cable presets manually OR import from a CSV/XLSX file
   * Enter distances to be connected
3. **View suggestions**:

   * Choose between single cable or multi-cable fitting
4. **Export results**:

   * Download solution set as a spreadsheet
5. **Install**:

   * Use the browser’s install option to pin it as an app on your PC or phone.

---

## 📦 Tech Stack

* **Frontend**: HTML, TailwindCSS, JavaScript
* **PWA**: Service workers + manifest
* **Local Storage**: Caching for persistent data
* **File Support**: XLSX/CSV parsing via `SheetJS`
  
---
## 📬 Feedback

Open to feedback and contributions. If you find bugs or have suggestions, kindly open an issue or reach out.

import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";

function Leftbar() {
    const [DisplayedComponent, setDisplayedComponent] = useState(() => Dashboard);

    useEffect(() => {
        setDisplayedComponent(() => Dashboard);
    }, []);

    const loadComponent = async (componentName) => {
        if (componentName === "transit") {
            try {
                const module = await import("./public_transit/Public_Transit_App.jsx");
                setDisplayedComponent(() => module.default);
            } catch (err) {
                console.error("Failed to load component", err);
            }
        }
        else if (componentName === "traffic") {
            try {
                const module = await import("./traffic_manage/Traffic_Management_App.jsx");
                setDisplayedComponent(() => module.default);
            } catch (err) {
                console.error("Failed to load component", err);
            }
        }
        else if (componentName === "event") {
            try {
                const module = await import("./event_manage/Event_Management_App.jsx");
                setDisplayedComponent(() => module.default);
            } catch (err) {
                console.error("Failed to load component", err);
            }
        }
        else if (componentName === "parking") {
            try {
                const module = await import("./smart_parking/Parking_Management_App.jsx");
                setDisplayedComponent(() => module.default);
            } catch (err) {
                console.error("Failed to load component", err);
            }
        }
        else if (componentName === "dash") {
            try {
                const module = await import("./Dashboard/Dashboard.jsx");
                setDisplayedComponent(() => module.default);
            } catch (err) {
                console.error("Failed to load component", err);
            }
        }
        else if (componentName === "emergency 1") {
            try {
                const module = await import("./Emergency 1/Emergency.jsx");
                setDisplayedComponent(() => module.default);
            } catch (err) {
                console.error("Failed to load component", err);
            }
        }
    };

    return (
        <div>
            <div className="leftbar">
                <Button load="Dashboard" content="Dashboard" onClick={() => loadComponent("dash")} />
                <br />
                <Button load="transit" content="Public Transit Management" onClick={() => loadComponent("transit")} />
                <br />
                <Button load="traffic" content="Traffic Flow Management" onClick={() => loadComponent("traffic")} />
                <br />
                <Button load="event" content="Event Management" onClick={() => loadComponent("event")} />
                <br />
                <Button load="parking" content="Parking Management" onClick={() => loadComponent("parking")} />
                <br />
                
                <Button load="Emer" content="Emergency Management" onClick={() => loadComponent("emergency 1")} />
                <br />
            </div>

            {/* Display Area with Scroll Enabled */}
            <div className="display" style={{overflow:"auto"}}>
                {DisplayedComponent && <DisplayedComponent />}
            </div>
        </div>
    );
}

export default Leftbar;

let prevAntSpace = 0; //? is safe prev state necessary?
// const API_URL = "http://192.168.17.17:8087";
export const API_URL = "http://localhost:3000";

export const setFreqApi = async (data) => {
  try {
    const response = await fetch(API_URL + "/api/settings/freq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("setFreqApi Success: ", jsonResponse);
    }
  } catch (error) {
    console.error("Error setFreqApi: ", error);
  }
};

export const setAntena = async (antSpace) => {
  if (prevAntSpace === antSpace) {
    console.log("setAntenna: Antenna spacing is already set to ", antSpace);
    return;
  }

  let typeAnt = "vhf";
  if (antSpace <= 0.25) {
    typeAnt = "uhf";
  }

  try {
    const response = await fetch(API_URL + "/api/ant/" + typeAnt, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("setAntenna Success: ", jsonResponse);
      prevAntSpace = antSpace;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const turnOffDF = async () => {
  setTimeout(() => {
    console.log("Turning Off DF");
    window.NodeFn.closeApp();
  }, 2000);
  try {
    const response = await fetch(API_URL + "/api/shutdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error turnOffDF: ", error);
  }
};

export const restartDF = async () => {
  setTimeout(() => {
    console.log("Restarting DF");
    window.NodeFn.closeApp();
  }, 2000);
  try {
    const response = await fetch(API_URL + "/api/restart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error RestartDF: ", error);
  }
};

export const setStationId = async (nameId) => {
  const stationId = {
    id: nameId,
  };
  try {
    const response = await fetch(API_URL + "/api/settings/station_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stationId),
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("setStationId Success: ", jsonResponse);
    }
  } catch (error) {
    console.error("Error setStationId: ", error);
  }
};

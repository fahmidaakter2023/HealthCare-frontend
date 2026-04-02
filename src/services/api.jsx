const BASE_URL = "https://healthcare-backend-production-863b.up.railway.app/api";

export const patientLogin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/patient/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  });
  return res.json();
};

export const patientRegister = async (data) => {
  const res = await fetch(`${BASE_URL}/patient/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getPatientAppointments = async (username) => {
  const res = await fetch(`${BASE_URL}/patient/${username}/appointments`);
  return res.json();
};

export const bookAppointment = async (data) => {
  const res = await fetch(`${BASE_URL}/patient/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const cancelAppointment = async (id) => {
  const res = await fetch(`${BASE_URL}/patient/appointments/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const doctorLogin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/doctor/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  });
  return res.json();
};

export const doctorRegister = async (data) => {
  const res = await fetch(`${BASE_URL}/doctor/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getDoctorAppointments = async () => {
  const res = await fetch(`${BASE_URL}/doctor/appointments`);
  return res.json();
};

export const confirmAppointment = async (id) => {
  const res = await fetch(`${BASE_URL}/doctor/appointments/${id}/confirm`, {
    method: "POST",
  });
  return res.json();
};

export const addPrescription = async (data) => {
  const res = await fetch(`${BASE_URL}/doctor/prescriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const adminLogin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  });
  return res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/admin/users`);
  return res.json();
};

export const banUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/admin/users/${userId}/ban`, {
    method: "DELETE",
  });
  return res.json();
};
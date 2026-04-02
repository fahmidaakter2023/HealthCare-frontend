const BASE_URL = 'https://healthcare-backend-production-863b.up.railway.app/api';

export const patientRegister = (data) =>
  fetch(`${BASE_URL}/patient/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Registration failed');
    return json;
  });

export const patientLogin = (data) =>
  fetch(`${BASE_URL}/patient/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Login failed');
    return json;
  });

export const getPatientAppointments = (patientName) =>
  fetch(`${BASE_URL}/patient/${patientName}/appointments`)
    .then((res) => res.json());

export const bookAppointment = (data) =>
  fetch(`${BASE_URL}/patient/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Booking failed');
    return json;
  });

export const cancelAppointment = (id) =>
  fetch(`${BASE_URL}/patient/appointments/${id}`, { method: 'DELETE' })
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Cancel failed');
      return json;
    });

export const getAllDoctors = () =>
  fetch(`${BASE_URL}/doctor/all`)
    .then((res) => res.json());

export const doctorRegister = (data) =>
  fetch(`${BASE_URL}/doctor/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Registration failed');
    return json;
  });

export const doctorLogin = (data) =>
  fetch(`${BASE_URL}/doctor/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Login failed');
    return json;
  });

export const getDoctorAppointments = () =>
  fetch(`${BASE_URL}/doctor/appointments`)
    .then((res) => res.json());

export const confirmAppointment = (id) =>
  fetch(`${BASE_URL}/doctor/appointments/${id}/confirm`, { method: 'POST' })
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Confirm failed');
      return json;
    });

export const rejectAppointment = (id) =>
  fetch(`${BASE_URL}/doctor/appointments/${id}/reject`, { method: 'POST' })
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Rejection failed');
      return json;
    });
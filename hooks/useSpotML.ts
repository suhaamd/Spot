import { useEffect, useRef, useState } from 'react';

const API_URL = 'http://192.168.1.25:5000/predict';

const FORM_LABELS: Record<number, { text: string; color: string }> = {
  0: { text: 'GOOD FORM', color: '#22C55E' },
  1: { text: 'OKAY FORM', color: '#EAB308' },
  2: { text: 'BAD FORM',  color: '#EF4444' },
};

export function useSpotML() {
  const [ready, setReady]       = useState(false);
  const [exercise, setExercise] = useState('DETECTING...');
  const [formInfo, setFormInfo] = useState(FORM_LABELS[0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function predict(imu: number[][]) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imu }),
      });
      const data = await res.json();
      setExercise(data.exercise.toUpperCase());
      setFormInfo({
        text:  data.form_label.toUpperCase(),
        color: data.color === 'green'  ? '#22C55E'
             : data.color === 'yellow' ? '#EAB308'
             : '#EF4444'
      });
    } catch (e) {
      console.error('API error:', e);
    }
  }

  // Simulate live sensor windows every 2 seconds
  useEffect(() => {
    setReady(true);
    intervalRef.current = setInterval(() => {
      // Fake IMU window — shape (125, 9)
      const fakeIMU = Array.from({ length: 125 }, () =>
        Array.from({ length: 9 }, () => Math.random() * 2 - 1)
      );
      predict(fakeIMU);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { ready, exercise, formInfo, predict };
}
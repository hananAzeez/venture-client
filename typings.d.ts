interface Activity {
  time: string;
  description: string;
  name: string;
  mapUrl: string;
}

interface Day {
  day: number;
  description: string;
  activities: Activity[];
}

interface ItineraryProps {
  destination: string;
  numberOfDays: number;
  description: string;
  days: Day[];
}

interface itinaryWithImageActivity extends Activity {
  activityImg: string;
}

interface itinaryWithImageDay {
  day: number;
  description: string;
  activities: itinaryWithImageActivity[];
}

interface itinaryWithImage extends ItineraryProps {
  placeImg: string;
  days: itinaryWithImageDay[];
}

interface SignUpFormData {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface Person {
  fname: string;
  lname: string;
  phone: string;
  email: string;
}

import { useState } from 'react';

export default function ToggleButton() {
  // Step 1: Create a state to track the toggle state
  const [isToggled, setIsToggled] = useState(false);

  // Step 2: Create a function to handle the button click
  const handleToggle = () => {
    setIsToggled(!isToggled);
  }
}
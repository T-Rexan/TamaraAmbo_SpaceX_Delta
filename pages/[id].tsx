import React from 'react';

function DetailPage() {
  const fetchSingleLaunch = async () => {
    const res = await fetch(
      'https://api.spacexdata.com/v3/launches?flight_number=1',
    );
    const data = await res.json();
    console.log(data);
  };

  fetchSingleLaunch();

  return <div>DetailPage</div>;
}

export default DetailPage;

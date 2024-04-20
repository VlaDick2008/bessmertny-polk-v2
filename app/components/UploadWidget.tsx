import React from 'react';

export default function UploadWidget() {
  const cloudinartyRef = React.useRef();
  React.useEffect(() => {
    cloudinartyRef.current = window.cloudinarty;
    console.log(cloudinartyRef.current);
  }, []);
}

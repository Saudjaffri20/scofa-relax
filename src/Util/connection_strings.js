export let connection_string;
export let image_url;

// const PORT = 7080;

if (window.location.hostname == "localhost") {
  connection_string = `http://72.249.68.73:8000`;
  image_url = `http://72.249.68.73:8000`;
  // connection_string = `https://backend.relax.scofa.com`;
  // image_url = `https://backend.relax.scofa.com`;
} else {
  connection_string = `https://backend.relax.scofa.com`;
  image_url = `https://backend.relax.scofa.com`;
}

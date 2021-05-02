export default function Home() {
  function generateRandomString(length: number): string {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const client_id = "MY_CLIENT_ID";
  const redirect_uri = "http://localhost:3000/callback";
  const scope = "user-read-private user-read-email";
  const state = generateRandomString(16);

  return (
    <div className="container">
      <div id="login">
        <h1>This is an example of the Authorization Code flow</h1>
        <a
          href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`}
          className="btn btn-primary"
        >
          Log in with Spotify
        </a>
      </div>
      <div id="loggedin">
        <div id="user-profile"></div>
        <div id="oauth"></div>
        <button className="btn btn-default" id="obtain-new-token">
          Obtain new token using the refresh token
        </button>
      </div>
    </div>
  );
}

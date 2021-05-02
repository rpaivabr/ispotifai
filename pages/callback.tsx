import { GetServerSideProps, NextPage } from "next";
import { ReactNode } from "react";

interface Data {
  children: ReactNode;
  display_name: string;
  images: { url: string }[];
  id: string;
  email: string;
  external_urls: { spotify: string };
  href: string;
  country: string;
  access_token: string;
  refresh_token: string;
}

const Callback: NextPage = (props: Data) => {
  return (
    <>
      <div className="container">
        <h1>Logged in as {props.display_name}</h1>
        <div className="media">
          <div className="pull-left">
            <img
              className="media-object"
              width="150"
              src={props.images[0].url}
            />
          </div>
          <div className="media-body">
            <dl className="dl-horizontal">
              <dt>Display name</dt>
              <dd className="clearfix">{props.display_name}</dd>
              <dt>Id</dt>
              <dd>{props.id}</dd>
              <dt>Email</dt>
              <dd>{props.email}</dd>
              <dt>Spotify URI</dt>
              <dd>
                <a href={props.external_urls.spotify}>
                  {props.external_urls.spotify}
                </a>
              </dd>
              <dt>Link</dt>
              <dd>
                <a href={props.href}>{props.href}</a>
              </dd>
              <dt>Profile Image</dt>
              <dd className="clearfix">
                <a href={props.images[0].url}>{props.images[0].url}</a>
              </dd>
              <dt>Country</dt>
              <dd>{props.country}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>oAuth info</h2>
        <dl className="dl-horizontal">
          <dt>Access token</dt>
          <dd className="text-overflow">{ props.access_token }</dd>
          <dt>Refresh token</dt>
          <dd className="text-overflow">{ props.refresh_token }</dd>
        </dl>
      </div>
    </>
  );
};

export default Callback;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect_uri = "http://localhost:3000/callback";
  const client_id = "f46f539986434d16a3b90e7a01bc8a72";
  var client_secret = "013741d3776a496f82c13f0514a6dc3a";

  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      code: String(context.query.code),
      redirect_uri,
      grant_type: "authorization_code",
    }),
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });
  const { access_token, token_type, refresh_token } = await token.json();

  const me = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `${token_type} ${access_token}` },
  });
  const resp = await me.json();
  console.log(resp);

  return { props: { ...resp, access_token, refresh_token } as Data };
};

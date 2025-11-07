export default function Profile({ user }) {
  if (!user) return <div>Please log in.</div>;
  return (
    <div className="profile-page">
      <h2>Perfil</h2>
      <img src={user.photoURL} alt={user.displayName} style={{ borderRadius: '50%', width: 96 }}/>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      {/* Add more user data here */}
    </div>
  );
}

export default function Profile({ user }) {
  if (!user) return <div>Ingrese para ver sus datos</div>;
  return (
    <div className="profile-page">
      <h2>Perfil</h2>
      <img src={user.photoURL} alt={user.displayName} style={{ borderRadius: '50%', width: 96 }}/>
      <p>Nombre: {user.displayName}</p>
      <p>Email: {user.email}</p>
      {/* Add more user data here */}
    </div>
  );
}

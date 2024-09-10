import './Message.css';

function Location({senderId, message}) {
	return (
	  <div className="message">
		<span className="author">{senderId}</span>
		<p className="content">{message}</p>
	  </div>
	);
  }
  
  export default Location;
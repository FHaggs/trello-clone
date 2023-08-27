import '../App.css';

const CardItem = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(JSON.stringify(formData))
        fetch('http://127.0.0.1:3333/cardsUpdate', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                id: props.id,
                newCardListId: props.nextListId
            })

        })
        .then(() => props.stateChanger(true))

        .catch((err) => {
            console.log(err.message);
        })
    };
    const handleGoBack = (event) => {
        event.preventDefault();
        //alert(JSON.stringify(formData))
        fetch('http://127.0.0.1:3333/cardsUpdate', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                id: props.id,
                newCardListId: props.previousListId
            })

        })
        .then(() => props.stateChanger(true))

        .catch((err) => {
            console.log(err.message);
        })
    };


    return (

        <div className="card">
            <div className='container'>
                <h3>{props.title}</h3>
                <p>{props.content}</p>
                
                {props.previousListId && <button className="small-button-left" onClick={handleGoBack}>{'<'}</button>}
                {props.nextListId && <button className="small-button-right" onClick={handleSubmit}>{'>'}</button>}
            </div>
        </div>
    

    );
}

export default CardItem;

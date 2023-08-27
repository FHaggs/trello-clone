import '../App.css';
import CardItem from "../components/CardItem";


const CardList = (props) => {
    return (
        <div className="trello__list">
            <h2 className='list-name'>{props.name}</h2>
            {props.cards.map((card) => {
                return (
                    <CardItem id={card.id} key={card.id} title={card.name} content={card.description} nextListId={props.nextList && props.nextList.id} stateChanger={props.stateChanger} previousListId={props.previousList && props.previousList.id}/>
                )
            })}
           


        </div>
    )
}


export default CardList;
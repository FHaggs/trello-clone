import React, {useState, useEffect} from "react";
import CardList from "../components/CardList";

const Home = () => {
    const [lists, setList] = useState([]);




    const [formData, setFormData] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (event) => {
        setFormData(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(JSON.stringify(formData))
        fetch('http://127.0.0.1:3333/lists', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                name: formData,
            })

        })
        .then(() => {
            setIsLoading(true);
            setFormData("")
        })
        .catch((err) => {
            console.log(err.message);
        })
    };


    useEffect(() => {
        fetch('http://127.0.0.1:3333/lists')
        .then((response) => response.json())
        .then((data) => {
            setList(data);
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err.message);
         });
    }, [isLoading])

    // user id = cljo9zlyf0002zqb3l0bzk139
    //DocId = cljo9yqlq0001zqb39ubzvuxs


    return (
        <div> 
        <div className="page-title">
        <form onSubmit={handleSubmit}>
        <input type="text" id="name" name="name" className="form-control" placeholder="Nome" value={formData} onChange={handleChange} required />
        <button type="submit">Adicionar outra Lista</button>
        </form>
        </div>
        <div className="trello">
        {lists.map((list, index) => {

            return (
                <div>
                    <CardList key={list.id} name={list.name} cards={list.cards} nextList={lists[index+=1]} stateChanger={setIsLoading} previousList={lists[index-=2]}/>
                </div>
            )
        })}



        </div>
        </div>
    )
}


export default Home;

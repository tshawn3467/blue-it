

export default function Categories() {


    return (
        
        <div className="categoriesContainer">
            <div className="titleContainer">
                    <h1 className="title">
                        Categories Page
                    </h1>
            </div>
            {/* 
                topics url ex: /topics/a-1/   /topics/b-1/  ...
                single topic url ex: /t/gaming/   /t/sports/  ...
            */}
            <div className="categoryContainer" >
                <ul className="categoryList">
                    <li>
                        <div className="category">
                        <span>-----Topic-----</span>
                        </div>
                    </li>
                    <li>
                        <div className="category">
                        <span>A nightmare on elm street 4: the 2004 movie</span>
                        </div>
                    </li>
                    <li>
                        <div className="category">
                        <span>Adventure time the secret of the nameless kingdom</span>
                        </div>
                    </li>
                </ul>
                
            </div>
            <div className="categoryContainer" >

            </div>
            <div className="categoryContainer" >

            </div>
            
        </div>
    )
}
import React from 'react';
import Card from '../../component/card';
import Nav from '../../component/nav';

const Index = () => {
    const data = {
        "name": "For python web service" ,
        "min_desc": ""
    }

    return (
        <div>
            <div className='bg-blue-900 px-8'>
                <Nav />
            </div>
            

            <div>
                <Card data={data} />
            </div>

        </div>
    );
}

export default Index;

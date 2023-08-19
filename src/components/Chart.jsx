import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Chart = ({title, data, Xaxis_dataKey,Line_datakey,grid, className}) => {

  return (
    <div className={'chart-container '+className}>
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data ={data}>
                <XAxis dataKey={Xaxis_dataKey} />
                <Line type="monotone" dataKey={Line_datakey} stroke='#5550bd' activeDot={{ r: 6 }}/>
                <Tooltip />
                {
                    grid &&
                    <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5" />
                }
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart
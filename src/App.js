/* eslint-disable no-console */
import { useState } from 'react'
import produce from 'immer'
import './styles/home.css'
import { styled } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

export default function App() {
  const [list, setList] = useState([])
  const [task, setTask] = useState({
    title: '',
    description: '',
    isDone: false
  })

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12
      }
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2
    }
  }))

  function addTask() {
    setList(
      produce(list, draft => {
        draft.push(task)
      })
    )
  }

  function delTask(index) {
    setList(
      produce(list, draft => {
        draft.splice(index, 1)
      })
    )
  }

  return (
    <div className="container">
      <strong>To Do</strong>
      <input
        placeholder="Título"
        value={task.title}
        onChange={e =>
          setTask(
            produce(task, draft => {
              draft.title = e.target.value
            })
          )
        }
      />
      <input
        placeholder="Description"
        value={task.description}
        onChange={e =>
          setTask(
            produce(task, draft => {
              draft.description = e.target.value
            })
          )
        }
      />

      <button onClick={addTask}>Adicionar</button>
      <button className="delButton" onClick={() => setList([])}>
        Remover Todos
      </button>
      {list.map((item, index) => (
        <div className="list" key={index}>
          <h1 className="title">{item?.title}</h1>
          <p className="description">{item?.description}</p>
          <div className="switch">
            <FormControlLabel
              control={<Android12Switch />}
              onChange={e =>
                setList(
                  produce(list, draft => {
                    draft[index].isDone = e.target.checked
                  })
                )
              }
            />
          </div>
          <button className="delButton" onClick={() => delTask(index)}>
            Remover
          </button>
        </div>
      ))}
    </div>
  )
}

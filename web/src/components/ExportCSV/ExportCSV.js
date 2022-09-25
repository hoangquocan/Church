import { CSVLink } from 'react-csv'
import { openConfirmModal } from '@mantine/modals'

const ExportCsv = ({ csvData, csvHeader, fileName, onClick }) => {
  const handleClick = (ev, done) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete Group {name}?</p>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => done(true),
    })
  }
  return (
    <CSVLink
      headers={csvHeader}
      data={csvData}
      filename={fileName}
      onClick={(ev, done) => handleClick(ev, done)}
      asyncOnClick={true}
    >
      <button className="btn-cyan">
        Export Data <ion-icon name="arrow-redo-outline"></ion-icon>
      </button>
    </CSVLink>
  )
}

export default ExportCsv

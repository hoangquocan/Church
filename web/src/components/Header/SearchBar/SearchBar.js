import HeadlessTippy from '@tippyjs/react/headless'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Loader } from '@mantine/core'
import Popper from '../Popper'
import MemberItem from '../MemberItem'
import './SearchBar.scss'

const QUERY = gql`
  query MemberSearchName($nameSearch: String) {
    memberSearchName(nameSearch: $nameSearch) {
      id
      name
      phoneNumber
      email
      urlAvatar
    }
  }
`
const SearchBar = () => {
  const [nameSearch, setNameSearch] = useState('')
  // const [searchResult, setSearchResult] = useState([])
  const [showResult, setShowResult] = useState(false)

  const inputRef = useRef()

  const { loading, error, data } = useQuery(QUERY, {
    skip: !nameSearch,
    variables: { nameSearch: nameSearch },
  })
  // if (loading)
  //   return (
  //     <div style={{ textAlign: 'center' }}>
  //       <Loader variant="oval" size="md" color="dark" />
  //     </div>
  //   )
  // if (error) return `Error! ${error.message}`

  let searchResult = []
  if (data) {
    searchResult = data.memberSearchName
  }

  const handleClear = () => {
    setNameSearch('')
    // setSearchResult([])
    inputRef.current.focus()
  }

  const handleHideResult = () => {
    setShowResult(false)
  }

  const handleChange = (event) => {
    const valueSearch = event.target.value
    setNameSearch(valueSearch)
  }

  return (
    <div className='tippy-searchbar'>
      <HeadlessTippy
        interactive
        placement="bottom"
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className="search-result" tabIndex="-1" {...attrs}>
            <Popper>
              <h4 style={{paddingLeft: '12px', color: '#868E96'}}>Members</h4>
              {searchResult.map((member) => (
                <MemberItem key={member.id} data={member} />
              ))}
            </Popper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className="search-input">
          <input
            ref={inputRef}
            value={nameSearch}
            onChange={handleChange}
            placeholder="Tìm Thành Viên"
            spellCheck={false}
            onFocus={() => setShowResult(true)}
          />
          {nameSearch && <button className="search-clear" onClick={handleClear}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>}
          <button className="search-btn">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
      </HeadlessTippy>
    </div>
  )
}

export default SearchBar

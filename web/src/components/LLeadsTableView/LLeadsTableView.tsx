import { useEffect, useState } from 'react'

import { TabList } from '@mui/lab'
import { Box as Section, Card, Grid, styled } from '@mui/material'
import { useTranslation } from 'react-i18next' // styled components

import { prettyDate } from 'src/util/dateConverter'

import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'
import LogSkelton from '../shimmerLoaders/logSkelton'

const rowsCounter = (parent, searchKey) => {
  return searchKey === 'all'
    ? parent.filter((item) =>
        [
          'new',
          'followup',
          'visitfixed',
          'visitdone',
          'visitcancel',
          'negotiation',
        ].includes(item.Status.toLowerCase())
      )
    : searchKey === 'archieve_all'
    ? parent.filter((item) =>
        ['notinterested', 'blocked', 'junk', 'dead'].includes(
          item.Status.toLowerCase()
        )
      )
    : parent.filter(
        (item) => item?.Status?.toLowerCase() === searchKey.toLowerCase()
      )
}

const LLeadsTableView = ({
  setFetchLeadsLoader,
  setisImportLeadsOpen,
  fetchLeadsLoader,
  selUserProfileF,
  leadsFetchedData,
  leadsTyper,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const [value, setValue] = useState('all')
  const [tableData, setTableData] = useState([])
  const [tabHeadFieldsA, settabHeadFieldsA] = useState([])

  const [statusSepA, setStatusSepA] = useState([])

  // const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [finalKeyA, setFinalKeyA] = useState([])

  const handleChange = (_, newValue) => {
    console.log('newvalue is ', newValue)
    setValue(newValue)
  }

  useEffect(() => {
    console.log(
      'my Array data is delayer 2',
      leadsFetchedData.length,
      new Date()
    )

    // axios
    //   .get('/api/tableData1/all')
    //   .then(({ data }) => {
    //     setTableData(tableData1)
    //   })
    //   .catch((error) => {
    //     // setTableData(tableData1)
    //     console.log(error)
    //   })

    const tabHeadFieldsA1 =
      leadsTyper === 'inProgress'
        ? [
            { lab: 'In Progress', val: 'all' },
            { lab: 'New', val: 'new' },
            { lab: 'Follow Up', val: 'followup' },
            { lab: 'Visit Fixed', val: 'visitfixed' },
            // { lab: 'Visit Done', val: 'visitdone' },
            // { lab: 'Visit Cancel', val: 'visitcancel' },
            { lab: 'Negotiation', val: 'negotiation' },
            // { lab: 'Reassign', val: 'reassign' },
            // { lab: 'RNR', val: 'RNR' },
            { lab: 'Un Assigned', val: 'unassigned' },
            // { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
        : leadsTyper === 'archieveLeads'
        ? archieveTab
        : [
            { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
    settabHeadFieldsA(tabHeadFieldsA1)

    leadsTyper === 'inProgress'
      ? setValue('all')
      : leadsTyper === 'archieveLeads'
      ? setValue('archieve_all')
      : setValue('booked')
  }, [])

  const handleDelete = async (ids) => {
    const { data } = await axios.post('/api/tableData1/delete', {
      ids,
    })
    setTableData(data)
  }

  const filterTable = tableData.filter((item) =>
    value !== '' ? item.role.toLowerCase() === value : item.role
  )

  const archieveTab = [
    { lab: 'Archieve', val: 'archieve_all' },
    { lab: 'Dead', val: 'dead' },
    { lab: 'Not Interested', val: 'notinterested' },
    { lab: 'Blocked', val: 'blocked' },
    { lab: 'Junk', val: 'junk' },
  ]
  useEffect(() => {
    // split data as per
    const leadsHeadA =
      leadsTyper === 'inProgress'
        ? [
            { lab: 'In Progress', val: 'all' },
            { lab: 'New', val: 'new' },
            { lab: 'Follow Up', val: 'followup' },
            { lab: 'Visit Fixed', val: 'visitfixed' },
            { lab: 'Visit Done', val: 'visitdone' },
            { lab: 'Visit Cancel', val: 'visitcancel' },
            { lab: 'Negotiation', val: 'negotiation' },
            // { lab: 'Reassign', val: 'reassign' },
            // { lab: 'RNR', val: 'RNR' },
            { lab: 'Un Assigned', val: 'unassigned' },
            // { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
        : leadsTyper === 'archieveLeads'
        ? archieveTab
        : [
            { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
    const y = {}

    const z1 = []
    const whole = {
      new: [],
      followup: [],
      all: [],
      visitfixed: [],
      visitdone: [],
      vistcancel: [],
      negotiation: [],
      unassigned: [],
      others: [],
    }
    const bookedArr = {
      booked: [],
      all: [],
      others: [],
    }

    const archieveArr = {
      archieve_all: [],
      all: [],
      dead: [],
      notinterested: [],
      blocked: [],
      junk: [],
      others: [],
    }
    // vedant
    if (leadsTyper === 'inProgress') {
      console.log('my Array data is delayer z2', new Date())
      const z2 = leadsFetchedData
        .sort((a, b) => b.Date - a.Date)
        .map((fil) => {
          const { Status } = fil

          if (!Status) {
            return
          }

          const statusLowerCase = Status.toLowerCase()

          whole.all.push(fil)

          switch (statusLowerCase) {
            case 'new':
              return whole.new.push(fil)
            case 'followup':
              return whole.followup.push(fil)
            case 'visitfixed':
              return whole.visitfixed.push(fil)
            case 'visitdone':
              return whole.visitdone.push(fil)
            case 'vistcancel':
              return whole.vistcancel.push(fil)
            case 'negotiation':
              return whole.negotiation.push(fil)
            case 'unassigned':
              return whole.unassigned.push(fil)
            default:
              return whole.others.push(fil)
          }
        })

      console.log('my Array data is delayer z2', z2, z1, whole, new Date())
      setStatusSepA([whole])
    } else if (leadsTyper === 'archieveLeads') {
      const z2 = leadsFetchedData
        .sort((a, b) => b.Date - a.Date)
        .map((fil) => {
          const { Status } = fil

          if (!Status) {
            return
          }

          const statusLowerCase = Status.toLowerCase()

          archieveArr.archieve_all.push(fil)

          switch (statusLowerCase) {
            case 'dead':
              return archieveArr.dead.push(fil)
            case 'notinterested':
              return archieveArr.notinterested.push(fil)
            case 'blocked':
              return archieveArr.blocked.push(fil)
            case 'junk':
              return archieveArr.junk.push(fil)
            default:
              return archieveArr.others.push(fil)
          }
        })

      console.log('filter stroke z2', z2, z1, archieveArr)
      setStatusSepA([archieveArr])
    } else {
      const z2 = leadsFetchedData
        .sort((a, b) => b.Date - a.Date)
        .map((fil) => {
          const { Status } = fil

          if (!Status) {
            return
          }

          const statusLowerCase = Status.toLowerCase()

          bookedArr.all.push(fil)

          switch (statusLowerCase) {
            case 'booked':
              return bookedArr.booked.push(fil)
            default:
              return bookedArr.others.push(fil)
          }
        })

      console.log('filter stroke z2', z2, z1, bookedArr)
      setStatusSepA([bookedArr])
    }

    console.log('filter stroke', leadsFetchedData, leadsHeadA, statusSepA)
  }, [leadsFetchedData, tabHeadFieldsA])

  useEffect(() => {
    setFinalKeyA(statusSepA[0]?.[value])
  }, [value])

  return (
    <Section pb={4}>
      <Card
        sx={{
          boxShadow: 4,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <div className="mb-1 border-b border-gray-200 ">
              {/* bg-[#fdb7b7] */}
              <ul
                className="flex flex-wrap -mb-px "
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {tabHeadFieldsA.map((d, i) => {
                  return (
                    <li key={i} className="mr-2" role="presentation">
                      <button
                        className={`inline-block py-4 px-4 text-sm font-medium text-center text-[#4f5861] rounded-t-lg border-b-2  hover:text-gray-600 hover:border-[#1A91EB] dark:text-gray-400 dark:hover:text-gray-300  ${
                          value === d.val
                            ? 'border-[#1A91EB] text-gray-800'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => {
                          setFetchLeadsLoader(true)
                          setValue(d.val)
                          setFetchLeadsLoader(false)
                        }}
                      >
                        <span
                          className={`font-PlayFair ${
                            value === d.val
                              ? 'text-[#0080ff] text-gray-800'
                              : ''
                          }`}
                        >
                          {' '}
                          {`${d.lab} `}
                        </span>
                        <span className="bg-gray-100 text-black px-2 py-1 rounded-full ml-[4px]  ">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                          {statusSepA[0][d.val]?.length || 0}
                        </span>
                        {/*
                        <div className="px-2 mt-1 text-[9px] text-black  rounded-full">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {rowsCounter(leadsFetchedData, d.val).length}
                          </span>
                        </div> */}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* {
              <table>
                {statusSepA[0]?.[value].map((dat, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{prettyDate(dat.Date).toLocaleString()}</td>
                      <td>{dat.Name.toString()}</td>
                    </tr>
                  )
                })}
              </table>
            } */}
            {fetchLeadsLoader &&
              [1, 2, 3].map((data, i) => <LogSkelton key={i} />)}
            {!fetchLeadsLoader && (
              <LLeadsTableBody
                // data={filterTable}
                fetchLeadsLoader={fetchLeadsLoader}
                handleDelete={handleDelete}
                selStatus={value}
                rowsParent={statusSepA[0]}
                selUserProfileF={selUserProfileF}
                newArray={statusSepA[0]?.[value]}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Section>
  )
}

export default LLeadsTableView

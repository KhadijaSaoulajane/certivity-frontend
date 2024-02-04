import ApiService from '../api/ApiService'
import {useState,useEffect} from "react";
import CommentsTable from "./CommentsTable";

function Home() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPage, setSelectedPage] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [pages, setPages] = useState(null);
    const [audits, setAudits] = useState([]);

    const handleChange = (event) => {
        const {  value } = event.target;
        setNewComment(value);
    };



   const getAudits = ()=>{
        ApiService.getAudits().then(response=>{
            setAudits(response) ;
        });
    }

    const addComment = () => {

        ApiService.addComment(selectedPage.id,newComment)
            .then((response) => {
             console.log("response: ",response.data);
                setIsModalVisible(false);
                setNewComment("");
                setSelectedPage(null);
                getPages();
                getAudits();
            })


    };

    useEffect(() => {
        getContent();
    }, []);

    const getContent = ()=>{
        ApiService.getURLContent("https://en.wikipedia.org/wiki/A_Tale_of_Two_Cities").then(response=>{
            setPages(response);
            getAudits();
        })
    }

    const getPages = ()=>{
        ApiService.getPages().then(response=>{
            setPages(response);
        })
    }


    return (
      <div className="mt-5 grid grid-cols-2 grid-rows-1 gap-3">
    <div className="flex flex-col justify-center">
      {!pages && <div>Loading Html content...</div>}
      {pages && (
          pages.map((page, index) => (
                <div key={index}  className="page bg-white shadow-md rounded-lg p-4 mb-4">
                    <div onClick={()=>{setIsModalVisible(true); setSelectedPage(page)} } data-modal-target="default-modal" data-modal-toggle="default-modal" className="comment-icon float-right"  >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: page.html }} />
                </div>
      ))

      )}
    </div>
<div>
    <h1 className="text-center font-extrabold">History</h1>
            {audits.length == 0 && <div>No changes yet</div>}
            {audits.length>0 && (
            <table className="table-auto min-w-full divide-y divide-gray-200 w-full mt-5">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        OldValue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        New Value</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {audits.map((audit,index)=>(
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {audit.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {audit.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {audit.oldValue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {audit.newValue}</td>
                    </tr>
                    ))}

                </tbody>
            </table>
                )}
</div>
          {isModalVisible &&
              <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                   aria-modal="true">
                  <div
                      className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                           aria-hidden="true"></div>
                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true">&#8203;</span>

                      <div
                          className="modal inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                          <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                              <button type="button" onClick={()=> {setIsModalVisible(false);setSelectedPage(null);setNewComment("")}}
                                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  <span className="sr-only">Close</span>
                                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                       viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"/>
                                  </svg>
                              </button>
                          </div>
                          <div>

                              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                  Page Comments
                              </h3>
                              <div className="mt-5 sm:mt-6">
                                  <div className="flex">
                                      <input type="text" name="comment"
                                             placeholder="Add your comment"
                                             className="w-5/6"
                                             value={newComment}
                                             onChange={handleChange}        />
                                      <button type="button" onClick={()=>{addComment();}}
                                              className="w-1/6 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                          Add comment
                                      </button>
                                      </div>

                              </div>
                              <div className="mt-2">
                                  <CommentsTable
                                      page={selectedPage}
                                  />
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          }


      </div>
  )
}

export default Home

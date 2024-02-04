import React, { Fragment, useState } from 'react';
import ApiService from "../api/ApiService";

function CommentsTable({ page }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(5);

    // Pagination logic
    const pageNumbers = [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    let currentComments = [];
    if (page.comments) {
        for (let i = 1; i <= Math.ceil(page.comments?.length / commentsPerPage); i++) {
            pageNumbers.push(i);
        }
        const indexOfLastComment = currentPage * commentsPerPage;
        const indexOfFirstComment = indexOfLastComment - commentsPerPage;
        currentComments = page.comments.slice(indexOfFirstComment, indexOfLastComment);
    }

    const editComment = (index) => {
    };

    const deleteComment = (index) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            console.log("Deleting comment at index:", index);

            ApiService.deleteComment(page.id,page.comments[index])
                .then((response) => {
                    console.log("response: ",response.data);
                    page.comments.splice(index, 1);
                })

        }
    };

    return (
        <Fragment>
            {page.comments?.length > 0 ? (
                <div>
                    <table className="min-w-full divide-y divide-gray-200 w-full mt-5">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Comment
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentComments.map((comment, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {comment}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => editComment(index)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteComment(index)} className="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            ) : (
                <p>No comments</p>
            )}
        </Fragment>

    );
}

export default CommentsTable;

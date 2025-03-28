import { useState } from "react";
import books from "../data/reviewed_books.json";

const ReviewedBooksList = () => {
  const [sortBy, setSortBy] = useState("title");
  const [sortAsc, setSortAsc] = useState(true);

  const sortedBooks = [...books].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle null or undefined
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    // Compare strings or numbers
    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortAsc ? -1 : 1;
    if (aValue > bValue) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            {[
              ["Title", "title"],
              ["Author", "author"],
              ["Rating", "rating"],
              ["Date Read", "date_read"],
              ["Pages", "number_of_pages"]
            ].map(([label, key]) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="cursor-pointer p-2"
              >
                {label} {sortBy === key ? (sortAsc ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, i) => {
            const pageLink = `/book/${book.slug}/`;
            return (
              <tr key={i} className="border-t hover:bg-gray-100">
                <td className="p-2">
                  <a
                    href={pageLink}
                    className="text-blue-600 hover:underline"
                  >
                    {book.title}
                  </a>
                </td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.rating}</td>
                <td className="p-2">{book.date_read ? book.date_read : ""}</td>
                <td className="p-2">{book.number_of_pages != null ? book.number_of_pages : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewedBooksList;
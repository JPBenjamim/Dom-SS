import Workbook from "react-excel-workbook";

const ExcelExport = ({ filename, worksheets }) => {
  return (
    <div className="excel-export-container">
      <Workbook
        filename={filename}
        element={
          <button className="download-excel-button">
            <span>Exportar</span>
            <img
              src={
                "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_excel-512.png"
              }
              alt=""
            />
          </button>
        }
      >
        {worksheets.map(({ index, name, columns, data }) => {
          return (
            <Workbook.Sheet name={name} data={data} key={index}>
              {columns.map(({ index, label, value }) => {
                return <Workbook.Column label={label} value={value} key={index} />;
              })}
            </Workbook.Sheet>
          );
        })}
      </Workbook>
    </div>
  );
};

export {ExcelExport};

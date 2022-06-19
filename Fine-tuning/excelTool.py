import xlrd

def replace_with_underscores(cell):
    return cell.value.replace(" ", "_")

if __name__ == '__main__':
    wb = xlrd.open_workbook("inputs.xls")
    sh = wb.sheet_by_index(0)

    i = 0
    for row in sh.get_rows():
        content = row[0].value
        filename = "covid-texts/text-" + str(i) + ".txt"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        i = i + 1
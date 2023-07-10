# main_script.py

import multiprocessing

def run_file(file_name):
    exec(open(file_name).read())

if __name__ == '__main__':
    file_names = ['3060scraper.py', '3070scraper.py', '3080scraper.py', '3090scraper.py']

    processes = []
    for file_name in file_names:
        process = multiprocessing.Process(target=run_file, args=(file_name,))
        processes.append(process)
        process.start()

    for process in processes:
        process.join()

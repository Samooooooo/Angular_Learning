import time
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains


logging.basicConfig(filename='test_FinestCoffe_loginTest.log')


def Open_WebPage():
    driver = webdriver.Chrome()
    driver.get('http://localhost:4200/home')
    return driver


def OpenLearnMode(driver):
    login_link = driver.find_element(By.XPATH, "/html/body/lpc-root/header/lpc-header/div/div/button[2]")
    login_link.click()


def OpenCheckMode(driver):
    login = driver.find_element(By.XPATH, "/html/body/lpc-root/header/lpc-header/div/div/button[3]")
    login.click()


# def Assertion(driver, userName):
#     loggInName = driver.find_element(By.XPATH, "//*[@id='accountbar']/table/tbody/tr[1]/td")
#     assert loggInName.text == userName
#     logging.info(f"Expected username: '{userName}', Logged in as: '{loggInName.text}'")


   
def test_LoginClickble_Shop():
    driver = Open_WebPage()
    OpenLearnMode(driver)
    QuestionsList = driver.find_element(By.XPATH,'/html/body/lpc-root/main/lpc-question-list/div/ul')
    assert QuestionsList.is_displayed()
    logging.info("Learn Mode Is working")
    time.sleep(1)
    driver.quit()

def test_LoginClickble_Shop():
    driver = Open_WebPage()
    OpenCheckMode(driver)
    Question = driver.find_element(By.XPATH,'/html/body/lpc-root/main/lpc-check-q-details/div/div/div/h3')
    assert Question.is_displayed()
    logging.info("Check Mode Is working")
    time.sleep(1)
    driver.quit()
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Support extends Component {
  // {/* Render method returns a second navbar and the bank's regulations the screen. */}
  render () {
    return (
      <div>
      <div className='navbar2'>
      <NavLink to="/support" className="navButton"> Banking Regulations </NavLink>
      <NavLink to="/legal" className="navButton"> Legal </NavLink>
      <NavLink to="/faq" className="navButton"> FAQ </NavLink>
      <NavLink to="/contact" className="navButton"> Contact US </NavLink>
      </div>
            <div className="content">
              <div className="Once-off Payments w3-container city">
                <h1>Banking Regulations</h1>
                1. What is the legal framework for banking regulation?<br/><br/>
                South Africa has a well-established banking regulatory framework. The banking capital requirements in the Banks Act, 1990 (Banks Act) and its<br/>
                subordinate legislation, together with the exchange control regulation enforced in South Africa by the national treasury, meant that South <br/>
                African banks were largely shielded from the 2008 global financial crises.<br/>
                The Financial Sector Regulation Act, 2017 (FSR Act) was signed into law on 21 August 2017, giving effect to the implementation of the <br/>
                "Twin Peaks" model of regulation in the South African financial sector. The Minister of Finance determined that the FSR Act (with the exception<br/>
                of a few transitional periods) would commence on 1 April 2018. As a result of the commencement of the FSR Act, and in particular of section<br/>
                290, read with Schedule 4, of the FSR Act, the Banks Act has been amended to replace references to the Registrar of Banks at the Bank <br/>
                Supervision Department of the South African Reserve Bank (SARB) with the newly established Prudential Authority (PA). Accordingly, the <br/>
                PA is responsible for supervising the operation of banks in South Africa, and ensuring compliance by banks with the Banks Act.<br/>
                Regulatory authorities<br/><br/>
                2. What are the regulatory authorities for banking regulation in your jurisdiction? What is the role of the central bank in banking regulation?<br/><br/>
                Lead bank regulators<br/>
                The SARB as the central bank of South Africa is primarily responsible for overseeing banks. The PA, as a juristic person operating within<br/>
                the administration of the SARB, supervises the domestic activities of all banks, representative offices and branches of foreign banks, and <br/>
                the foreign activities of South African banks. A key objective of the PA is to promote the soundness of the domestic banking system, throug<br/>
                h effective and efficient application of international regulatory and supervisory standards and best practice. To keep informed of <br/>
                international regulatory and supervisory developments, the PA participates in, and contributes to, various international forums.<br/>
                Other authorities<br/>
                The Financial Intelligence Centre monitors and gives guidance to banks as accountable institutions, in relation to their know-your-client<br/>
                duties and compliance with the Financial Intelligence Centre Act, 2001.<br/>
                The Financial Services Board which was established under the Financial Services Board Act, 1990, has now been replaced with the Financial<br/>
                Service Conduct Authority (FSCA), as established on 1 April 2018 under the FSR Act. The FSCA is a dedicated market conduct regulator for <br/>
                the financial services sector. The Financial Advisory and Intermediary Services Act, 2002 (FAIS) regulates the provision of financial <br/>
                services in relation to a number of products, including deposits. For banks to market deposits in South Africa, there is a registration <br/>
                requirement under FAIS and compliance is overseen by the FSCA.<br/>
                The National Credit Regulator (NCR) is established under the National Credit Act, 2005 (NCA) and is responsible for the regulation of the<br/>
                South African credit industry. The NCA requires the NCR to promote the development of an accessible credit market, particularly to address <br/>
                the needs of historically disadvantaged persons, low income persons and remote, isolated or low density communities. It is also tasked with <br/>
                the registration of credit providers, credit bureaux and debt counsellors. To the extent that a bank in South Africa wants to advance credit <br/>
                to natural persons, it must be registered as a credit provider and subject to the oversight of the NCR.<br/>
                Central bank<br/>
                The SARB is the central bank of South Africa, and its primary objective is the achievement and maintenance of price stability in the <br/>
                interest of sustainable economic growth. The relationship between the SARB and the state is that between banker and client, as ordinarily<br/>
                understood in the law of banking and bills of exchange. The SARB recognises the need to pursue balanced economic development and growth,<br/>
                based on a market system, private and social initiatives, effective competition and social fairness.<br/>
                The South African Reserve Bank Act, 1989 (SARB Act), together with the Banks Act, the Mutual Banks Act, 1993 and the FSR Act, assigns <br/>
                responsibility for the registration and supervision of banks to the SARB. These Acts provide that the powers for bank registration and <br/>
                supervision are assigned to the PA. Together with the regulations issued under the Banks Act, these Acts provide a comprehensive legal framework<br/>
                for banking supervision in South Africa. Under the Acts, the PA, as a juristic person under the administration of the SARB, is accountable to <br/>
                the Governor of the SARB, and also has a direct reporting line to the Minister.<br/>
                The Governor or a Deputy Governor can instruct the PA to cause the affairs of an unregistered person suspected of carrying on the business of a <br/>
                bank or mutual bank to be inspected in accordance with the provisions of Part 4 of Chapter 9 of the FSR Act (section 12, SARB Act).<br/>
                Others<br/>
                SARB is also a member of and contributor to various international governance bodies such as the G20, the International Monetary Fund (IMF), the <br/>
                Bank for International Settlements (BIS) and the Committee of Central Bank Governors (CCBG) in the Southern African Development Community (SADC). <br/>
                SARB can develop the financial sector, in accordance with member commitments to global regulatory regimes.<br/>
                Bank licences<br/><br/>
                3. What licence(s) are required to conduct banking services and what activities do they cover?<br/><br/>
                An entity cannot conduct the business of a bank unless it is a public company registered as a bank under the Banks Act (section 11(1), Banks Act).<br/>
                To register:<br/>
              </div>
            </div>
            </div>
          )
        }
      }

export default Support

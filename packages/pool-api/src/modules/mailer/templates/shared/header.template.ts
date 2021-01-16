import html from 'fake-tag';

export default html`
  <mj-head>
    <mj-style>
      @media (max-width:480px) { .hidden-mobile { display: none; } }
      .card-shadow { box-shadow: 0 8px 20px 5px rgba(13,2,86,0.05); } .blue-btn
      { filter: drop-shadow(0px 6px 12px rgba(64,39,231,0.3)); }
      .linear-background { background-image: linear-gradient(0deg, #FF00A7 0%,
      #FF006E 100%); } h1 { font-size: 36px; line-height: 41px; font-weight:
      600; } h2 { font-size: 24px; line-height: 27px; } h3 { font-size: 16px; }
    </mj-style>
    <mj-attributes>
      <mj-text
        padding="0"
        padding-bottom="12px"
        font-size="16px"
        line-height="22px"
        color="#0D0256"
        font-family="Arial"
      />
      <mj-button
        css-class="purple-btn"
        padding="0"
        padding-bottom="12px"
        align="left"
        background-color="#CE99FF"
        color="white"
        border-radius="42px"
        font-size="16px"
        line-height="24px"
        font-weight="600"
        font-family="Arial"
      />
    </mj-attributes>
  </mj-head>
`;

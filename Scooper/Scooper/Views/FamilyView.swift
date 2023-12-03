//
//  FamilyView.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/3/23.
//

import SwiftUI

struct FamilyView: View {
    
    @State var guardianName: String
    @State var info: [String]
    
    var body: some View {
        
        VStack {
            Text("Email")
            Text(info[1])
        }
    }
}

#Preview {
    FamilyView(guardianName: "John Doe", info: ["John Doe Jr", "john@test.com"])
}

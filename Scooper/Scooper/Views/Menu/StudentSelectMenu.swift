//
//  StudentSelectMenu.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/2/23.
//

import SwiftUI

struct StudentSelectMenu: View {
    
    @StateObject var vm: ScooperViewModel = ScooperViewModel()
    @StateObject var login: LoginViewModel = LoginViewModel()
    @State var scoopTeamID: String
    
    var body: some View {
        
        List {
            ForEach(vm.familyStatus) { student in
                NavigationLink {
                    SchedulingView(id: student.id, student: student.name, scoopTeamID: scoopTeamID)
                } label: {
                    Text(student.name)
                }
            }
        }
        .navigationTitle("Select Student")
        .navigationBarTitleDisplayMode(.large)
        .onAppear {
            login.loadCurrentUser()
            Task {
                do {
                    try await vm.getChilren(name: login.name ?? "")
                } catch {
                    print(error)
                }
            }
        }
    }
}

#Preview {
    StudentSelectMenu(scoopTeamID: "863F4E258FA3")
}
